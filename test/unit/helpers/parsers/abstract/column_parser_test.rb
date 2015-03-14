require 'test_helper'
require 'cascadable'

class ColumnParserTest < ActiveSupport::TestCase
  class DummyStream
    def put (result)
      @stream = result
    end

    def stream
      @stream
    end
  end

  def setup
    @stream = DummyStream.new
    @parser = CompositeParser.new('./test/fixtures/test.xls')._
      .with { |parser|
        parser.column._
            .from(3)                          # (optional) start row index. If not specified iteration starts from first row
            .to(12)                           # (optional) end row index. If not specified parser iterates until first empty cell is found
            .column(2)                        # column index to be parsed
            .transformed(:round)              # transforms each cell value
            .for(@stream)                     # object that receives results
            .in(:put)}                        # object's method that will get results as parameter
  end

  def test_column_parser
    @parser.parse
    assert_equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], @stream.stream)
  end

end