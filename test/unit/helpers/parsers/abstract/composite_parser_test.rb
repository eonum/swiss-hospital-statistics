require 'test_helper'
require 'cascadable'

class CompositeParserTest < ActiveSupport::TestCase
  class DummyStream

    def put (result)
      @stream = [] unless @stream
      @stream.push(result)
    end

    def stream
      @stream
    end

  end

  def setup
    @stream = DummyStream.new
    @parser = CompositeParser.new('./test/fixtures/test.xls')._
      .with { |composite|
      composite.column._
          .column(2)
          .from(3)
          .to(12)
          .transformed{|value| value.round}
          .repeat
          .with{ |column|
              column.row._
                  .from(column.column)
                  .to(column.column + 2)
                  .row(column.position)
                  .for(@stream)
                  .in(:put)
                  .transformed(:round)
        }}
  end

  def test_composite_parser
    @parser.parse
    assert_equal([
                     [1, 2, 4],
                     [2, 4, 16],
                     [3, 6, 36],
                     [4, 8, 64],
                     [5, 10, 100],
                     [6, 12, 144],
                     [7, 14, 196],
                     [8, 16, 256],
                     [9, 18, 324],
                     [10, 20, 400]], @stream.stream)
  end
end