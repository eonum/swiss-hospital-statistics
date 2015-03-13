module Cascadable
  class CascadeProxy < Object
    instance_methods.each do |m|
      undef_method(m) if m.to_s !~ /(?:^__|^nil?$|^send$|^object_id$)/
    end

    def initialize(object)
      @object = object
    end

    def method_missing(method_name, *args, &block)
      @object.send(method_name, *args, &block)
      self
    end
  end

  def _
    CascadeProxy.new(self)
  end
end

class Object
  include Cascadable
end