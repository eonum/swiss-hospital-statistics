class SuDICDParser < AbstractParser

  @@firstRow = 21

  def parse(numberOfRowsToParse)

    parsedRows = parseRows(numberOfRowsToParse, @@firstRow)
    parsedIcdCodes = Array.new

    parsedRows.each do |row|
      icdCode = IcdCode.new
      icdCode.code = row[1]
      icdCode.text_de = "year: #{row[0]}, code: #{row[1]}"
      parsedIcdCodes.push(icdCode)
    end

    return parsedIcdCodes
  end

end