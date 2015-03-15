require 'pragmas'
require 'scripting'
Dir['./app/models/**/*.rb'].each{ |f| require f }

class Catalog

  attr_reader :catalog

  def initialize
    @catalog = { :codes => {  } }
  end

  def codes
    Pragma.pragmas_named_in(:code, self.class).collect{|each| self.send(each.method, self)}
  end

  def be_preview
    self.codes.each{|each| self.push_code_type (each) }
    self
  end

  def push_code_type (_code)
    code = { :description => _code.type_description }
    @catalog[:codes][_code.tag.to_sym] = code
    code
  end

  def be_preview_for (symbol)
    type = self.codes.select {|each| each.tag == symbol.to_sym}.first
    return self unless type
    code = self.push_code_type(type)
    codes = type.all.pluck(:code).to_a
    code[:codes] = codes
    self
  end

  def be_info_for (symbol)
    type = self.codes.select {|each| each.tag == symbol.to_sym}.first
    return self unless type
    code = self.push_code_type(type)
    codes = type.all.pluck(:code, :description).to_a
    code[:codes] = codes
    self
  end

  def be_full_info_for (code_type, code_id)
    type = self.codes.select {|each| each.tag == code_type.to_sym}.first
    return self unless type
    code = self.push_code_type(type)
    codes = type.find_by(code: code_id)
    codes = clean_documents_for_json(codes)
    code[:codes] = codes
    self
  end

  def update_db
    self.codes.each{|each|
      pragmas = Pragma.pragmas_named_in(:parser, each)
      unless pragmas.empty?
        parser = pragmas.first.method.eonum_value(each)
        parser.parse
        codes = parser.stream.to_codes
        puts 'Parsed '+ codes.size.to_s + ' ' + each.name + 's'
        each.collection.insert codes.collect{|each| each.as_document }
      end
    }
  end

  def to_json
    @catalog
  end

  private
  def clean_documents_for_json (object)
    data = object.to_a
    data.collect{
      |each|
      document = each.as_document
      clean_hash(document)
      document
    }
  end

  def clean_hash(hash)
    return hash.each{|each| clean_hash(each)} if hash.class <= Array
    return unless hash.class <= Hash
    hash.delete('_id')
    hash.delete('_type')
    hash.delete('_mongoclass')
    hash.values.each{|each| clean_hash(each)}
  end
end