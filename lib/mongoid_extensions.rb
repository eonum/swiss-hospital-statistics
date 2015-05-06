class Object
  def deep_copy
    Marshal.load(Marshal.dump(self).force_encoding('ISO-8859-1').encode('UTF-8'))
  end

  def instance_values_hash
    my_hash = Hash[instance_variables.map { |name| [name[1..-1], instance_variable_get(name).instance_values_hash] }]
    return self if my_hash.empty?
    my_hash[:_mongoclass] = self.class.name
    my_hash
  end
end

class Class
  def from_string(str)
    str.split('::').inject(Object) do |mod, class_name|
      mod.const_get(class_name)
    end
  end
end

class AbstractCategory
  def mongoize
    self.instance_values_hash
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

class Hash
  def mongoize
    self.class.mongoize(self)
  end

  def instance_values_hash
    self.inject({}) { |h, (k, v)| h[k] = v.instance_values_hash; h }
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
    return [] if object.nil?
    object.collect{|each| each.class.demongoize(each)}
  end

  def instance_values_hash
    self.collect{|each| each.instance_values_hash}
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