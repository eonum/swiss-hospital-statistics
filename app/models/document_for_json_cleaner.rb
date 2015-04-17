class DocumentForJSONCleaner
  def clean_documents_for_json (object)
    data = object.to_a
    data.collect{
        |each|
      document = each.as_document
      clean_hash(document)
      document
    }
  end

  private
  def clean_hash(hash)
    return hash.each{|each| clean_hash(each)} if hash.class <= Array
    return unless hash.class <= Hash
    hash.delete('_id')
    hash.delete('_type')
    hash.delete('_mongoclass')
    hash.values.each{|each| clean_hash(each)}
  end
end