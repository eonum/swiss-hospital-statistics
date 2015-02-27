module Api
  module V1
    class CodesController < ApplicationController

      def index
        render json: {message:'all codes'}
      end

      def show
        render json:  {message: params[:id]}
      end
    end
  end
end