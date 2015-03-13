require 'test_helper'
require 'cascadable'

class TabParserTest < ActiveSupport::TestCase
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
        parser.tab._
            .from(0)
            .to(3)
            .transformed{|value| value.to_s}
            .for(@stream)
            .in(:put)}
  end

  def test_tap_parser
    @parser.parse
    assert_equal(['Tab 01', 'Tab 02', 'Tab 03', 'Tab 04'], @stream.stream)
  end
end

