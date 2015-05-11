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
  attr_reader :is_children_repeated
  attr_reader :is_distinct
  attr_reader :force_merging
  attr_reader :results
  attr_reader :repeat_offset

  def initialize (file_name = nil)
    @files = Array(file_name)
    @parsers = []
    @cache = []
    @results = []
    @is_repeat = false
    @force_merging = false
    @is_distinct = false
    @is_children_repeated = true
    @receiver_method = :on_parsed
    @receiver_file_method = :on_file
    @after_parsed_logic = lambda { |*args|  }
    @transformed_logic = lambda { |each| each }
    @when_logic = lambda {|*args| true}
    @parsing_logic = lambda {|*args| }
    @repeat_logic = lambda {|*args| }
    @repeat_offset = 0
    self.file(@files.first)
  end

  #adds tab parser to the parsers collection
  def tab
    require 'parsers/abstract/tab_parser'
    add_parser(TabParser.new)
  end

  #adds row parser to the parsers collection
  def row
    require 'parsers/abstract/row_parser'
    add_parser(RowParser.new)
  end

  #adds column parser to the parsers collection
  def column
    require 'parsers/abstract/column_parser'
    add_parser(ColumnParser.new)
  end

  #adds box parser to the parsers collection
  def box
    require 'parsers/abstract/box_parser'
    add_parser(BoxParser.new)
  end

  #loads Excel file to Roo
  def file (file_name = nil)
    return unless file_name
    sheet = Roo::Excel.new(file_name)
    sheet.default_sheet = sheet.sheets.first
    self.sheet = sheet
  end

  def file_in (method_symbol)
    @receiver_file_method = method_symbol
    self
  end

  #yields parsing control to passed block (if there is any)
  def with (&block)
    block.call (self) if block_given?
    self
  end

  #defines where parsed results should be sent to
  def for (receiver)
    @receiver = receiver
    self
  end

  #defines where exactly in receiver parsed results should be sent to
  def in (method_symbol)
    @receiver_method = method_symbol
    self
  end

  def after (&block)
    @after_parsed_logic = block
    self
  end

  def transformed (object = nil, &block)
    @transformed_logic = object if object
    @transformed_logic = block if block_given?
    self
  end

  def when (object = nil, &block)
    @when_logic = object if object
    @when_logic = block if block_given?
    self
  end

  #sets parsing logic (defined by particular parser)
  def parsing (&block)
    @parsing_logic = block
    self
  end

  #sets parsing logic to be repeated
  def repeated (&block)
    @repeat_logic = block
    self
  end

  #repeats parsing logic to next units
  def repeat
    @is_repeat = true
    @parsers.each{|each| each.repeated}
    self
  end

  #parses input using composed parsing logic
  def parse
    @results = [ ]
    @cache = []
    @parsing_logic.call(self)
    @receiver.send(@receiver_method, @results) if @receiver && should_merge?
    @after_parsed_logic.call(self, @results)
    @parsers.each{ |each| each.parse } unless @is_repeat
    self
  end

  def parse_all
    @files.each{|file|
      self.file(file)
      self.stream_file_name(file)
      self.parse
    }
  end

  def merge
    @force_merging = true
    self
  end

  def distinct
    @is_distinct = true
    self
  end

  def sheet=(sheet)
    @sheet = sheet
    @parsers.each {|each| each.sheet = sheet}
    self
  end

  def offset(offset)
    @repeat_offset = offset
    self
  end

  private

  def add_parser (parser)
    @parsers.push(parser)
    parser.sheet = @sheet if @sheet
    parser.repeated if @is_repeat
    parser
  end

  def should_merge?
    return true if @force_merging
    !@is_repeat && @parsers.empty?
  end

  protected

  def stream (value, repeat = nil)
    should_save = !@cache.include?(value) || !@is_distinct
    @cache.push(value) if should_save
    @results.push(@transformed_logic.eonum_value(value)) if @when_logic.eonum_value(value) && should_save
    @receiver.send(@receiver_method, @results.last) if @receiver && !should_merge? && should_save
    @parsers.each {|each| each.repeat_logic.call(each, repeat + each.repeat_offset) if @is_children_repeated; each.parse } if @is_repeat && repeat
  end

  def stream_file_name(value)
    @receiver.send(@receiver_file_method, value) if @receiver && @receiver.respond_to?(@receiver_file_method)
  end

end