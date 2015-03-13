class CompositeParser

  attr_reader :parsers
  attr_reader :sheet
  attr_reader :receiver
  attr_reader :receiver_method
  attr_reader :after_parsed_logic
  attr_reader :transformed_logic
  attr_reader :when_logic
  attr_reader :parsing_logic
  attr_reader :repeat_logic
  attr_reader :is_repeat
  attr_reader :result

  def initialize (file_name = nil)
    @parsers = []
    @result = []
    @is_repeat = false
    @receiver_method = :on_parsed
    @after_parsed_logic = lambda { |*arg|  }
    @transformed_logic = lambda { |each| each }
    @when_logic = lambda {|*arg| true}
    @parsing_logic = lambda {|*arg| }
    @repeat_logic = lambda {|*args| }
    self.file(file_name)
  end

  def tab
    add_parser(TabParser.new)
  end

  def row
    add_parser(RowParser.new)
  end

  def column
    add_parser(ColumnParser.new)
  end

  def file (file_name = nil)
    return unless file_name
    sheet = Roo::Excel.new(file_name)
    sheet.default_sheet = sheet.sheets.first
    self.sheet = sheet
  end

  def with (&block)
    block.call (self) if block_given?
    self
  end

  def for (receiver)
    @receiver = receiver
    self
  end

  def in (method_symbol)
    @receiver_method = method_symbol
    self
  end

  def after (&block)
    @after_parsed_logic = block
    self
  end

  def transformed (&block)
    @transformed_logic = block
    self
  end

  def when (&block)
    @when_logic = block
    self
  end

  def parsing (&block)
    @parsing_logic = block
    self
  end

  def repeated (&block)
    @repeat_logic = block
    self
  end

  def repeat
    @is_repeat = true
    @parsers.each{|each| each.repeated}
    self
  end

  def parse
    @result = [ ]
    @parsing_logic.call(self)
    @receiver.send(@receiver_method, @result) if @receiver
    @after_parsed_logic.call(self, @result)
    @parsers.each{ |each| each.parse } unless @is_repeat
    self
  end

  def sheet=(sheet)
    @sheet = sheet
    @parsers.each {|each| each.sheet = sheet}
    self
  end

  private

  def add_parser (parser)
    @parsers.push(parser)
    parser.sheet = @sheet if @sheet
    parser.repeated if @is_repeat
    parser
  end

  protected

  def stream (value, repeat = nil)
    @result.push(@transformed_logic.call(value)) if @when_logic.call(value)
    @parsers.each {|each| each.repeat_logic.call(each, repeat); each.parse } if @is_repeat
  end

end