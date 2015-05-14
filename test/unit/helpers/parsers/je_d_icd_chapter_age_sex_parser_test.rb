require 'test_helper'
require 'cascadable'

class JeDIcdChapterAgeSexParserTest < ActiveSupport::TestCase

  def setup
    @parser = JeIcdChapterAgeSexParser.new('./test/fixtures/je-d-icd-chapters.xls')
    @results = @parser.parse
  end

  def test_first_dataset
    dataset = @results.first
    assert_equal("I", dataset.code)
    assert_equal(2013, dataset.year)

    data = dataset.categorised_data.at(:icd_chapter_sex_interval).first
    assert_not_nil(data)

    assert_equal(3.41280659, data['percentage'])
    assert_equal(4.1929361, data['number'])
    assert_equal(2, data['sex'])
    assert_equal(0, data['interval']['from'])
    assert_equal(14, data['interval']['to'])
  end

  def test_last_dataset
    dataset = @results.last
    assert_equal("XXI", dataset.code)
    assert_equal(2003, dataset.year)

    data = dataset.categorised_data.at(:icd_chapter_sex_interval).first
    assert_not_nil(data)

    assert_equal(12.6, data['percentage'])
    assert_equal(25, data['number'])
    assert_equal(0, data['sex'])
    assert_equal(0, data['interval']['from'])
  end

end