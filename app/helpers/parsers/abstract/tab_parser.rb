class TabParser < LinearParser

  protected

  def value_at (index)
    self.sheet.sheets[index]
  end

end