require 'test_helper'
require 'cascadable'

class SuDChopCompositeParserTest < ActiveSupport::TestCase

  def setup
    @stream = SuChopDrgIcdStream.new(ChopCodeDataset)
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

  def test_codes_class
    assert_equal(ChopCodeDataset, @codes.first.class)
    assert_equal(ChopCodeDataset, @codes.second.class)
  end

  def test_code_data
    first = @codes.first
    second = @codes.second

    assert_equal('0009', first.code)
    assert_equal('Sonstiger therapeutischer Ultraschall', first.description)

    assert_equal('99B611', second.code)
    assert_equal('Physikalisch-medizinische Komplexbehandlung, mehr als 7 Tage', second.description)
  end

  def test_code_years
    assert_not_nil(@codes.first.categorised_data)
    assert_not_nil(@codes.second.categorised_data)

    assert_equal(2013, @codes.first.year)
    assert_equal(2013, @codes.second.year)
  end

  def test_interval_categories

    assert_not_nil(@codes.first.categorised_data.categories)
    assert_not_nil(@codes.second.categorised_data.categories)

    assert_equal(1, @codes.first.categorised_data.categories.size)
    assert_equal(1, @codes.second.categorised_data.categories.size)

    assert_equal(1, @codes.first.categorised_data.at(:interval).length)
    assert_equal(1, @codes.second.categorised_data.at(:interval).length)

  end

  def test_interval_data
    first = @codes.first.categorised_data.at(:interval).first
    second = @codes.second.categorised_data.at(:interval).first

    assert_equal(1, first['n'])
    assert_equal(3.0, first['dad'])
    assert_equal(0.0, first['sa'])
    assert_equal(3.0, first['min'])
    assert_equal(3.0, first['max'])
    assert_equal(15, first['interval']['from'])
    assert_equal(39, first['interval']['to'])

    assert_equal(1, second['n'])
    assert_equal(12.0, second['dad'])
    assert_equal(0.0, second['sa'])
    assert_equal(12.0, second['min'])
    assert_equal(12.0, second['max'])
    assert_equal(15, second['interval']['from'])
    assert_equal(39, second['interval']['to'])
  end

  def test_percentile_categories
    first = @codes.first.categorised_data.at(:interval).first
    second = @codes.second.categorised_data.at(:interval).first

    assert_not_nil(first['categories'])
    assert_not_nil(second.categories)

    assert_equal(1, first.categories.size)
    assert_equal(1, second.categories.size)

    assert_not_nil(first.at(:percentile))
    assert_not_nil(second.at(:percentile))

    assert_equal(7, first.at(:percentile).length)
    assert_equal(7, second.at(:percentile).length)

    assert_equal(PercentileCategory, first.at(:percentile).first.class)
    assert_equal(PercentileCategory, second.at(:percentile).first.class)
  end

  def test_percentile_data
    first = @codes.first.categorised_data.categories['interval'].first['categories']['percentile']
    second = @codes.second.categorised_data.categories['interval'].first['categories']['percentile']

    assert_equal(5, first[0]['percentile'])
    assert_equal(3.0, first[0]['amount'])
    assert_equal(10, first[1]['percentile'])
    assert_equal(3.0, first[1]['amount'])
    assert_equal(25, first[2]['percentile'])
    assert_equal(3.0, first[2]['amount'])
    assert_equal(50, first[3]['percentile'])
    assert_equal(3.0, first[3]['amount'])
    assert_equal(75, first[4]['percentile'])
    assert_equal(3.0, first[4]['amount'])
    assert_equal(90, first[5]['percentile'])
    assert_equal(3.0, first[5]['amount'])
    assert_equal(95, first[6]['percentile'])
    assert_equal(3.0, first[6]['amount'])


    assert_equal(5, second[0]['percentile'])
    assert_equal(12.0, second[0]['amount'])
    assert_equal(10, second[1]['percentile'])
    assert_equal(12.0, second[1]['amount'])
    assert_equal(25, second[2]['percentile'])
    assert_equal(12.0, second[2]['amount'])
    assert_equal(50, second[3]['percentile'])
    assert_equal(12.0, second[3]['amount'])
    assert_equal(75, second[4]['percentile'])
    assert_equal(12.0, second[4]['amount'])
    assert_equal(90, second[5]['percentile'])
    assert_equal(12.0, second[5]['amount'])
    assert_equal(95, second[6]['percentile'])
    assert_equal(12.0, second[6]['amount'])
  end

end