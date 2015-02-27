module Api
  module V1
    class CodesController < ApplicationController

      include Parsers

      def index
        # put code to play with here
        Parsers::SuDParser.new.parse
        render json: {message:'all all'}
      end

      def show
        render json: {code: params[:id]}
      end
    end
  end
end