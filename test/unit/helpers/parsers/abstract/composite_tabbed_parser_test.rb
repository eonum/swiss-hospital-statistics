require 'test_helper'
require 'cascadable'

class CompositeTabbedParserTest < ActiveSupport::TestCase
  # stupid stream where we save parsed table
  class DummyStream
    def put (result)
      @stream[@last_tab].push(result)
    end
    def tab (tab)
      @stream = {} unless @stream
      @last_tab = tab
      @stream[@last_tab] = []
    end
    def stream
      @stream
    end
  end

  def setup
    @stream = DummyStream.new
    # define custom parser
    @parser = CompositeParser.new('./test/fixtures/test.xls')._
      .with { |composite|
      composite.tab._
          .for(@stream)
          .in(:tab)
          .repeat
          .with{|tab|
            tab.column._
              .column(2)
              .from(3)
              .repeat
              .with{ |column|
                column.row._
                  .from(column.column)
                  .row(column.from)
                  .for(@stream)
                  .in(:put)
              }
          }
      }
  end

  def test_composite_parser
    @parser.parse
    assert_equal({
                     'Tab 01' => [
                         [1.0, 2.0, 4.0],
                         [2.0, 4.0, 16.0],
                         [3.0, 6.0, 36.0],
                         [4.0, 8.0, 64.0],
                         [5.0, 10.0, 100.0],
                         [6.0, 12.0, 144.0],
                         [7.0, 14.0, 196.0],
                         [8.0, 16.0, 256.0],
                         [9.0, 18.0, 324.0],
                         [10.0, 20.0, 400.0]],
                     'Tab 02' => [
                         [0.0, 0.0, 0.0],
                         [0.5, 1.0, 1.0],
                         [1.0, 2.0, 4.0],
                         [1.5, 3.0, 9.0],
                         [2.0, 4.0, 16.0],
                         [2.5, 5.0, 25.0],
                         [3.0, 6.0, 36.0],
                         [3.5, 7.0, 49.0],
                         [4.0, 8.0, 64.0],
                         [4.5, 9.0, 81.0]],
                     'Tab 03' => [
                         [0.0, 0.0, 0.0],
                         [0.1, 0.2, 0.04000000000000001],
                         [0.2, 0.4, 0.16000000000000003],
                         [0.3, 0.6, 0.36],
                         [0.4, 0.8, 0.6400000000000001],
                         [0.5, 1.0, 1.0],
                         [0.6, 1.2, 1.44],
                         [0.7, 1.4, 1.9599999999999997],
                         [0.8, 1.6, 2.5600000000000005],
                         [0.9, 1.8, 3.24]],
                     'Tab 04' => [
                         [0.0, 0.0, 0.0],
                         [2.0, 4.0, 16.0],
                         [4.0, 8.0, 64.0],
                         [6.0, 12.0, 144.0],
                         [8.0, 16.0, 256.0],
                         [10.0, 20.0, 400.0],
                         [12.0, 24.0, 576.0],
                         [14.0, 28.0, 784.0],
                         [16.0, 32.0, 1024.0],
                         [18.0, 36.0, 1296.0]
                     ]}, @stream.stream)
  end
end