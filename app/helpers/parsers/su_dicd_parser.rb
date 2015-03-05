class SuDICDParser < AbstractParser

  def initialize(file)
    super(file)
    #redefine the first row
    @firstRow = 23
  end

  def processRow(row)
    icdCode = IcdCode.new
    icdCode.code = row[1]
    icdCode.text_de = "year: #{row[0]}, code: #{row[1]}"
    return icdCode
  end

end