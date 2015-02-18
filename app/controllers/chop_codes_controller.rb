class ChopCodesController < ApplicationController
  include SearchHelper

  def index
   @chop_codes = standard_search_index(params, ChopCode)
  end

  def show
    @chop_code = ChopCode.find(params[:id])
  end

  def search
    search_and_render ChopCode
  end

  def name
    @chop_code = ChopCode.where({ "short_code" => params[:code].gsub(".", "") }).first
    render 'show'
  end
end
