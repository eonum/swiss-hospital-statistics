module Api
  module V1
    module Groups
      class IcdController < ApplicationController
        def index
          render json: CodeCatalog.new.icd_chapters
        end
      end
    end
  end
end