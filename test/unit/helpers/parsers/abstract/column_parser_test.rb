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
            .from(3)
            .to(12)
            .column(2)
            .transformed{|value| value.round}
            .for(@stream)
            .in(:put)}
  end

  def test_column_parser
    @parser.parse
    assert_equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], @stream.stream)
  end

end