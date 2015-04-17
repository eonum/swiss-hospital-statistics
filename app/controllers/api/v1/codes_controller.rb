module Api
  module V1
    class CodesController < ApplicationController

      def index
        render json: Catalog.new.be_preview.to_json
      end

      def show
        render json: CodeCatalog.new.codes_for_tag(params[:id])
      end

      def new
        Catalog.new.update_db_code(AgeCodeDataset)
        render json: {:message => 'OK'}
      end

    end
  end
end