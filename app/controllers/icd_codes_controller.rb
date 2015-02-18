class IcdCodesController < ApplicationController
  include SearchHelper

  def index
    @icd_codes = standard_search_index(params, IcdCode)
  end

  def show
    @icd_code = IcdCode.find(params[:id])
  end

  def search
    search_and_render IcdCode
  end

  def name
    @icd_code = IcdCode.where({ "short_code" => params[:code].gsub(".", "") }).first
    render 'show'
  end
end
