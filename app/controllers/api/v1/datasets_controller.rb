module Api
  module V1
    class DatasetsController < ApplicationController
      def index
          render json: Catalog.new.be_info_for(params[:code_id]).to_json
      end

      def show
          render json: Catalog.new.be_full_info_for(params[:code_id], params[:id]).to_json
      end
    end
  end
end