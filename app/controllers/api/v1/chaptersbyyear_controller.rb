require 'datasets/icd_chapter_age_sex_dataset'

module Api
  module V1
    class ChaptersbyyearController < ApplicationController

      def show
        render json: DocumentForJSONCleaner.new.clean_documents_for_json(IcdChapterAgeSexDataset.where(:year => params[:id]).to_a)
      end

    end
  end
end