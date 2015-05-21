require 'datasets/top_3_icd_dataset'

module Api
  module V1
    class Top3datasetsController < ApplicationController

      def index
        render json: DocumentForJSONCleaner.new.clean_documents_for_json(Top3IcdDataset.all).to_a
      end

    end
  end
end