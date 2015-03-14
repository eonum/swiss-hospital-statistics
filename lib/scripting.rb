class Symbol

  def call (object)
    object.send(self)
  end

end