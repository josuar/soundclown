class UsersController < ApplicationController
  before_action :require_signed_in!, except: [:new, :create]
  before_action :require_signed_out!, only: [:new, :create]

  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.includes(:reblogged_tracks).find(params[:id])
    @reblogged_tracks = @user.reblogged_tracks
    @my_reblogged_tracks = current_user.reblogged_tracks
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find_by(params[:id])

    if @user.update
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  def destroy
    @user = User.find_by(params[:id])
    @user.destroy!
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username, :fname, :lname, :city)
  end
end
