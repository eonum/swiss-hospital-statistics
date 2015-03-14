require 'test_helper'

class IntervalTest < ActiveSupport::TestCase
  def setup
    @interval = Interval.new
  end

  def test_from_string_0_14
    @interval.from_s('0-14')
    assert_equal(0, @interval.from)
    assert_equal(14, @interval.to)
  end

  def test_from_string_14_20
    @interval.from_s('14-20')
    assert_equal(14, @interval.from)
    assert_equal(20, @interval.to)
  end

  def test_from_string_70_plus
    @interval.from_s('70+')
    assert_equal(70, @interval.from)
    assert_equal(nil, @interval.to)
    assert(@interval.infinite?)
  end

  def test_from_string_70
    @interval.from_s('70')
    assert_equal(70, @interval.from)
    assert_equal(nil, @interval.to)
    assert(@interval.infinite?)
  end
end