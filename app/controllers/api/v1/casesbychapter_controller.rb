module Api
  module V1
    class CasesbychapterController < ApplicationController

      def index
        render json: Catalog.new.be_preview.to_json
      end

      def show
        render json: (params[:id])
      end

    end
  end
end