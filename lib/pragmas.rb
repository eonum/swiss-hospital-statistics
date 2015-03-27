# Ruby implementation of Java-like method annotations or
# Pharo-like pragmas
module Pragmas
  def pragmas(meth=nil)
    return [] unless @__pragmas__
    return @__pragmas__[meth] if meth
    @__pragmas__.values.flatten
  end

  def pragmas_named_in(name, clazz=nil)
    pragmas = clazz ? clazz.pragmas : self.pragmas
    pragmas = [] unless pragmas
    pragmas.select{|each| each.name == name} if clazz
  end

  private
  def method_added(method)
    pragma_method_added(method)
    super
  end

  def singleton_method_added(method)
    pragma_method_added(method)
    super
  end

  def pragma_method_added(method)
    if @__last_pragmas__
    @__last_pragmas__.each{|each| each._method(method)}
    (@__pragmas__ ||= {})[method] = @__last_pragmas__
  end
    @__last_pragmas__ = nil
  end

  def method_missing(method, *args)
    return super unless /\A_/ =~ method
    (@__last_pragmas__ ||= []).push(Pragma.new(method[1..-1].to_sym, args))
  end
end

class Pragma
  extend Pragmas

  attr_reader :name
  attr_reader :method
  attr_reader :arguments

  def initialize (name, arguments)
    @name = name
    @arguments = arguments
  end

  def _method (method)
    @method = method
  end
end

class Module
  private

  def pragmatize!
    extend Pragmas
  end
end