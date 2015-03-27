module Api
  module V1
    class CodesController < ApplicationController

      def index
        render json: Catalog.new.be_preview.to_json
      end

      def show
        render json: Catalog.new.be_preview_for(params[:id]).to_json
      end

      def new
        Catalog.new.update_db_code(IcdCodeDataset)
        render json: {:message => 'OK'}
      end

    end
  end
end