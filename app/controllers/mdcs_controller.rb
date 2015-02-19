class MdcsController < ApplicationController
  def index
    @mdcs = Mdc.all.order_by([[ :code, :asc ]])
  end

  def show # logic tab
    @mdc = Mdc.find(params[:id])
    @codes = @mdc.drgs.order_by([[ :code, :asc ]]).paginate :page => params[:page], :per_page => 20
  end

  def name
    @mdc = Mdc.where({ "code" => params[:code] }).first
    @codes = @mdc.drgs.order_by([[ :code, :asc ]]).paginate :page => params[:page], :per_page => 20
    render 'show'
  end
end
