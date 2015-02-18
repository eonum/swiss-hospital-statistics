class SearchController < ApplicationController
  def index
    @query = params[:query] == nil ? "" : params[:query]
    lang = locale.to_s

    split = @query.split(" ")
    cond = []
    split.each do |word|
      cond << {"$or" => [{'code' => /#{Regexp.escape(word)}/i}, {"text_#{lang}" => /#{Regexp.escape(word)}/i}]}
    end
    cond = {"$and" => cond}
    if(@query == "")
      cond = {'code' => 'nocode'}
    end
    @drg = Drg.where(cond).paginate :page => params[:page]
    @mdc = Mdc.where(cond).paginate :page => params[:page]
    @chop = ChopCode.where(cond).paginate :page => params[:page]
    @icd = IcdCode.where(cond).paginate :page => params[:page]
  end

end
