class Symbol
  def eonum_value (object)
    object.send(self)
  end
end


class Proc
  def eonum_value (object)
    self.call(object)
  end
end