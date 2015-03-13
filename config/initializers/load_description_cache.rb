module DescriptionCache
  # Cache = Hash.new
  # CodePointCache = Hash.new
  # Cache['de'] = Hash.new
  # Cache['fr'] = Hash.new
  # Cache['it'] = Hash.new
  #
  # VariableCache = Hash.new
  #
  # IcdCode.all.each do |code|
  #   Cache['de'][code.short_code] = code.text_de
  #   Cache['fr'][code.short_code] = code.text_fr
  #   Cache['it'][code.short_code] = code.text_it
  #   CodePointCache[code.short_code] = code.code
  # end
  # ChopCode.all.each do |code|
  #   Cache['de'][code.short_code] = code.text_de
  #   Cache['fr'][code.short_code] = code.text_fr
  #   Cache['it'][code.short_code] = code.text_it
  #   CodePointCache[code.short_code] = code.code
  # end
  # Drg.all.each do |code|
  #   Cache['de'][code.code] = code.text_de
  #   Cache['fr'][code.code] = code.text_fr
  #   Cache['it'][code.code] = code.text_it
  # end

  def get (code, locale)
    return '' if code.blank?
    locale = locale.to_s
    if (locale != 'fr' && locale != 'it')
      locale = 'de'
    end
    sc = code.gsub('.', '')
    return Cache[locale][sc] == nil ? '' : Cache[locale][sc]
  end

  def code_point (code)
    return '' if code.blank?
    sc = code.gsub('.', '')
    return CodePointCache[sc] == nil ? sc : CodePointCache[sc]
  end

  module_function :get
  module_function :code_point

end