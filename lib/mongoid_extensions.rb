class Object
  def deep_copy
    Marshal.load(Marshal.dump(self))
  end
end

class Class
  def from_string(str)
    str.split('::').inject(Object) do |mod, class_name|
      mod.const_get(class_name)
    end
  end
end

class Hash
  def mongoize
    self.class.mongoize(self)
  end

  def self.demongoize(object)
    if object[:_mongoclass]
      hash_copy = object.deep_copy
      mongoclazz = hash_copy[:_mongoclass]
      document_class = Class.from_string(mongoclazz)
      hash_copy.delete('_mongoclass')
      demongoized_hash = Hash[hash_copy.map{|k,v| [k, v.class.demongoize(v)]}]
      return document_class.demongoize(demongoized_hash)
    end

    return object unless object.size > 0
    Hash[object.map{|k,v| [k, v.class.demongoize(v)]}]
  end
end

class Array

  def self.demongoize(object)
    object.collect{|each| each.class.demongoize(each)}
  end
end

module Mongoid
  module Document
  def mongoize
    attrs = self.attributes.deep_copy
    attrs[:_mongoclass] = self.class.name
    attrs
  end
  module ClassMethods
    def demongoize(object)
      return object unless object.class <= Hash
      document = new
      object.each{|k,v| document[k] = v }
      document
    end

    def mongoize(object)
      case object
        when self then object.mongoize
        when Hash then new(object).mongoize
        else object
      end
    end

    def evolve(object)
      case object
        when self then object.mongoize
        else object
      end
    end
  end

  end
end