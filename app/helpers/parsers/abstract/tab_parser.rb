class TabParser < LinearParser

  def initialize
    super
    @from = 0
    @is_children_repeated = false
  end

  protected

  def position(position=nil)
    sheet.default_sheet = sheet.sheets[position] if position && @is_repeat
    super(position)
  end

  def value_at (index)
    self.sheet.sheets[index]
  end

end