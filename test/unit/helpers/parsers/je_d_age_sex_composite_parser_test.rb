require 'test_helper'
require 'cascadable'

class JeDAgeSexCompositeParserTest < ActiveSupport::TestCase

  def setup
    @parser = JeAgeSexParser.new('./test/fixtures/je_d_agesex.xls')
    @results = @parser.parse
    @type1 = HospitalType.create(:text_de => 'Allgemeine Krankenhäuser, Zentrumsversorgung', :text_fr => 'Hôpitaux de soins généraux, prise en charge centralisée')
    @type2 = HospitalType.create(:text_de => 'Spezialkliniken: Rehabilitationskliniken', :text_fr => 'Cliniques spécialisées: cliniques de réadaptation')
  end

  def test_results_count
    assert_equal(585, @results.count)
  end

  def test_first_dataset
    dataset = @results.first
    assert_equal("Z380", dataset.code)
    assert_equal(2013, dataset.year)

    data = dataset.categorised_data.at(:sex_interval).first
    assert_not_nil(data)

    assert_equal(37.3056549, data.percentage)
    assert_equal(4.63833525, data.dad)
    assert_equal(2, data.sex)
    assert_equal(Interval.new(from: 0,to: 14), data.interval)
    assert_equal(@type1.text_de, data.hospital_type.text_de)
  end

  def test_last_dataset
    dataset = @results.last
    assert_equal("M544", dataset.code)
    assert_equal(1998, dataset.year)

    data = dataset.categorised_data.at(:sex_interval).first
    assert_not_nil(data)

    assert_equal(5.5, data.percentage)
    assert_equal(23.0262172284644, data.dad)
    assert_equal(0, data.sex)
    assert_equal(Interval.new(from: 0), data.interval)
    assert_equal(@type2.text_de, data.hospital_type.text_de)
  end

  def test_special_1998_data
    dataset = @results[540]
    assert_equal("Z380", dataset.code)
    assert_equal(1998, dataset.year)

    data = dataset.categorised_data.at(:sex_interval).first
    assert_not_nil(data)

    assert_equal(67.5, data.percentage)
    assert_equal(5.26797993689831, data.dad)
    assert_equal(0, data.sex)
    assert_equal(Interval.new(from: 0, to: 14), data.interval)
    assert_equal(@type1.text_de, data.hospital_type.text_de)
  end
end