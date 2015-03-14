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

  def test_codes_class
    assert_equal(ChopCode, @codes.first.class)
    assert_equal(ChopCode, @codes.second.class)
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
    assert_not_nil(@codes.first.years)
    assert_not_nil(@codes.second.years)

    assert_equal(1, @codes.first.years.size)
    assert_equal(1, @codes.second.years.size)

    assert_not_nil(@codes.first.at(2013))
    assert_not_nil(@codes.second.at(2013))

    assert_equal(2013, @codes.first.at(2013).year)
    assert_equal(2013, @codes.second.at(2013).year)
  end

  def test_interval_categories
    assert_not_nil(@codes.first.at(2013).categories)
    assert_not_nil(@codes.second.at(2013).categories)

    assert_equal(1, @codes.first.at(2013).categories.size)
    assert_equal(1, @codes.second.at(2013).categories.size)

    assert_equal(1, @codes.first.at(2013).at(:interval).length)
    assert_equal(1, @codes.second.at(2013).at(:interval).length)

    assert_equal(GeneralIntervalCategory, @codes.first.at(2013).at(:interval).first.class)
    assert_equal(GeneralIntervalCategory, @codes.second.at(2013).at(:interval).first.class)
  end

  def test_interval_data
    first = @codes.first.at(2013).at(:interval).first
    second = @codes.second.at(2013).at(:interval).first

    assert_equal(1, first.n)
    assert_equal(3.0, first.dad)
    assert_equal(0.0, first.sa)
    assert_equal(3.0, first.min)
    assert_equal(3.0, first.max)
    assert_equal(Interval.new(15,39), first.interval)

    assert_equal(1, second.n)
    assert_equal(12.0, second.dad)
    assert_equal(0.0, second.sa)
    assert_equal(12.0, second.min)
    assert_equal(12.0, second.max)
    assert_equal(Interval.new(15,39), second.interval)
  end

  def test_percentile_categories
    first = @codes.first.at(2013).at(:interval).first
    second = @codes.second.at(2013).at(:interval).first

    assert_not_nil(first.categories)
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
    first = @codes.first.at(2013).at(:interval).first.at(:percentile)
    second = @codes.second.at(2013).at(:interval).first.at(:percentile)

    assert_equal(PercentileCategory.new(5,3.0), first[0])
    assert_equal(PercentileCategory.new(10,3.0), first[1])
    assert_equal(PercentileCategory.new(25,3.0), first[2])
    assert_equal(PercentileCategory.new(50,3.0), first[3])
    assert_equal(PercentileCategory.new(75,3.0), first[4])
    assert_equal(PercentileCategory.new(90,3.0), first[5])
    assert_equal(PercentileCategory.new(95,3.0), first[6])
    
    assert_equal(PercentileCategory.new(5,12.0), second[0])
    assert_equal(PercentileCategory.new(10,12.0), second[1])
    assert_equal(PercentileCategory.new(25,12.0), second[2])
    assert_equal(PercentileCategory.new(50,12.0), second[3])
    assert_equal(PercentileCategory.new(75,12.0), second[4])
    assert_equal(PercentileCategory.new(90,12.0), second[5])
    assert_equal(PercentileCategory.new(95,12.0), second[6])
  end

end