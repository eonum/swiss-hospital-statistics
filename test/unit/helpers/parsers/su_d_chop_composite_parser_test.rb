require 'test_helper'
require 'cascadable'

class SuDChopCompositeParserTest < ActiveSupport::TestCase

  def setup
    @stream = SuChopDrgIcdStream.new(ChopCode)
    @parser = SuChopDrgIcdParser.new('./test/fixtures/su_d_chop.xls').stream(@stream)
    @parser.parse
    @codes = @stream.to_codes
  end

  def test_raw_map
    assert_equal({
                     '15-39' => {
                         2013 => {
                             '0009' => {
                                 :data => ['0009', 'Sonstiger therapeutischer Ultraschall', 1.0, 3.0, 0.0, 3.0, 3.0],
                                 :percentiles => {5 => 3.0, 10 => 3.0, 25 => 3.0, 50 => 3.0, 75 => 3.0, 90 => 3.0, 95 => 3.0}},
                             '99B611' => {
                                 :data => ['99B611', 'Physikalisch-medizinische Komplexbehandlung, mehr als 7 Tage', 1.0, 12.0, 0.0, 12.0, 12.0],
                                 :percentiles => {5 => 12.0, 10 => 12.0, 25 => 12.0, 50 => 12.0, 75 => 12.0, 90 => 12.0, 95 => 12.0}}
                         }}
                 },
                 @stream.map)
  end

  def test_codes_amount
    assert_equal(2, @codes.length)
  end
end