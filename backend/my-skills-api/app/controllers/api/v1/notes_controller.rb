class Api::V1::NotesController < ApplicationController
  def index
    # notes = Note.where(user_id: current_user.id).all
    notes = @current_user.notes
    render json: { notes: notes }, status: :ok
  end

  def create
    begin
      raise "Title cannot be empty" unless params[:title].strip.present?
      raise "Title must have at least 6 characters" unless params[:title].strip.length >= 6
      raise "Description cannot be empty" unless params[:description].present?
      raise "Description must have at least 10 characters" unless params[:description].strip.length >= 10
      raise "Tags cannot be empty" unless params[:tags].present?
      # raise "User id cannot be empty" unless params[:user_id].present?

      note = Note.create!(title: params[:title], description: params[:description], tags: params[:tags], user_id: @current_user.id)
      render json: { success: true, data: note }, status: :created

    rescue StandardError => e
      render json: { success: false, error: e.message }, status: :bad_request
    end
  end

  def update
    begin
      raise "Id not given in parameter." unless params[:id].present?
      note = Note.find_by(id: params[:id])
      raise "Id doesn't consist in table" unless note.present?
      raise "Title cannot be empty" unless params[:title].present?
      raise "Title must have at least 6 characters" unless params[:title].strip.length >= 6
      raise "Description Not Found" unless params[:description].present?
      raise "Description must have at least 10 characters" unless params[:description].length >= 10

      note.update!(title: params[:title], description: params[:description], tags: params[:tags], user_id: @current_user.id)
      render json: { success: true, data: note }, status: :created
    rescue StandardError => e
      render json: { success: false, message: e.message }, status: :bad_request
    end
  end

  def destroy
    begin
      raise "Id not given in parameter." unless params[:id].present?
      note = Note.find_by(id: params[:id])
      raise "Id doesn't consist in table" unless note.present?
      if note.user_id != @current_user.id
        raise "You are not authorized to delete this note."
      end
      note.destroy
      render json: { success: true, message: "Id successfully deleted." }, status: :ok
    rescue StandardError => e
      render json: { success: false, message: e.message }, status: :bad_request
    end

  end
end


