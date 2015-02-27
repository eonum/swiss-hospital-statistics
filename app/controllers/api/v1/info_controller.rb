module Api
  module V1
    class InfoController < ApplicationController
      def index
        render json: {code: params[:code_id]}
      end

      def show
        render json: {code: params[:code_id], id: params[:id], drg: @drg}
      end
    end
  end
end