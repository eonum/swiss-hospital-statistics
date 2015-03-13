require 'test_helper'
require 'cascadable'

class RowParserTest < ActiveSupport::TestCase
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
        parser.row._
            .from(2)
            .to(4)
            .row(3)
            .transformed{|value| value.round}
            .for(@stream)
            .in(:put)}
  end

  def test_row_parser
    @parser.parse
    assert_equal([1, 2, 4], @stream.stream)
  end

end

class DummReceiver

  def on_parsed (result)
    puts result.to_s
  end

end