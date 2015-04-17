module Api
  module V1
    class SpecificController < ApplicationController

      def show
        render json: CodeCatalog.new.specific_code(params[:code_id], params[:id])
      end

    end
  end
end