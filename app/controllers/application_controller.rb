class ApplicationController < ActionController::Base
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  helper :all # include all helpers, all the time
  helper_method :home_path, :standard_search_index

  before_filter :locale
  before_filter :export_i18n_messages

  rescue_from ActionController::UnknownFormat, with: :raise_not_found

  def raise_not_found
    render(text: 'Not Acceptable', status: 406)
  end

  def export_i18n_messages
    SimplesIdeias::I18n.export! if Rails.env.development?
  end

  # Sets the locale to the given language, e.g 'de', 'fr, 'it', 'en'
  def set_locale
    if(params[:new_locale] != 'de' && params[:new_locale] != 'fr' && params[:new_locale] != 'it' &&
          params[:new_locale] != 'en')
      params[:new_locale] = 'de'
    end
    I18n.locale = session[:locale] = params[:new_locale]
    params[:locale] = params[:new_locale]
    redirect_to request.env["HTTP_REFERER"].gsub(/locale=../, 'locale=' + locale) 
  end
  
  protected

  def default_url_options(options={})
    return options.merge( { :locale => I18n.locale } )
  end

  def locale
    I18n.locale = params[:locale] || (session[:locale] || 'de')
  end

  def store_location
    session[:return_to] = request.url
  end

  def escape_query query
    return (query or '').gsub(/\\/, '\&\&').gsub(/'/, "''")
  end

  def standard_search_index(params, model)
    query = escape_query(params[:q])
    lang = locale.to_s
    query2 = escape_query(params[:qt])
    return model.all.order_by([[ :code, :asc ]]).paginate(:page => params[:page], :per_page => 22) if query.blank? && query2.blank?
    return model.where({"code" => /#{Regexp.escape(query)}/i, "text_#{lang}" => /#{Regexp.escape(query2)}/i}).order_by([[ :code, :asc ]]).paginate(:page => params[:page], :per_page => 22)
  end

end
