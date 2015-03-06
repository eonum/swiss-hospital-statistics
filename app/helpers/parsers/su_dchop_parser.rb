class SuDCHOPParser < AbstractParser

  def initialize(file)
    super(file)
    #redefine the first row
    @firstRow = 23
  end

  def processRow(row)
    chopCode = ChopCode.new
    chopCode.code = row[1]
    return chopCode
  end

end