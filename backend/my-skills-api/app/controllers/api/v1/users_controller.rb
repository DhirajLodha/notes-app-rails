class Api::V1::UsersController < ApplicationController
  before_action :authenticate_request, except: [ :create ]
  # before_action :find_user, except: %i[create index]

  # GET /users
  def index
    @users = User.all
    render json: { message: "All Users Data", data: @users }, status: :ok
  end

  # GET /users/{username}
  def show
    begin
      raise "Id is not present" if params[:id].blank?
      @user = User.find(params[:id])
      render json: { success: "True", data: @user }, status: :ok
    rescue StandardError => e
      render json: { success: false, message: e.message }, status: :bad_request
    end
  end

  # POST /users
  # def create
  #   begin
  #     raise "Username cannot be empty" unless params[:username].present?
  #     raise "Email cannot be empty" unless params[:email].present?
  #     raise "Password cannot be empty" unless params[:password].present?
  #     @user = User.create!(username: params[:username], email: params[:email], password: params[:password])
  #     render json: { success: true, data: @user }, status: :created
  #
  #   rescue StandardError => e
  #     render json: { success: false, message: e.message }, status: :bad_request
  #   end
  # end

  def create
    begin
      user_params = params.require(:user).permit(:username, :email, :password)
      Rails.logger.info "Received params: #{user_params.inspect}"

      raise "Username cannot be empty" unless user_params[:username].present?
      raise "Email cannot be empty" unless user_params[:email].present?
      raise "Password cannot be empty" unless user_params[:password].present?

      if User.exists?(email: user_params[:email])
        raise "Email already exists. Try to log in."
      end

      @user = User.create!(user_params)
      render json: { success: true, data: @user }, status: :created
    rescue StandardError => e
      render json: { success: false, error: e.message }, status: :bad_request
    end
  end


  # PUT /users/{username}
  def update
    unless @user.update(user_params)
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  # DELETE /users/{username}
  # def destroy
  #   render json: { success: true, message: "Logged out successfully" }, status: :ok
  # end

  private

  # def find_user
  #   @user = User.find_by(id: params[:id])
  # rescue ActiveRecord::RecordNotFound
  #   render json: { errors: "User not found" }, status: :not_found
  # end

  def user_params
    params.permit(
      :username, :email, :password
    )
  end
end
