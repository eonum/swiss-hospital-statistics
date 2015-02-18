class DrgsController < ApplicationController
  include SearchHelper

  def index
    @drgs = standard_search_index(params, Drg)
  end

  def show
    @drg = Drg.find(params[:id])
    load params
  end

  def name
    @drg = Drg.where({ "code" => params[:code] }).first
    load params
    render 'show'
  end

  def search
    search_and_render Drg
  end

  def load params
    @locale = locale
  end
end
