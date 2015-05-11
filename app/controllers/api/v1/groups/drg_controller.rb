module Api
  module V1
    module Groups
      class DrgController < ApplicationController
        def index
          render json: CodeCatalog.new.drg_chapters
        end
      end
    end
  end
end