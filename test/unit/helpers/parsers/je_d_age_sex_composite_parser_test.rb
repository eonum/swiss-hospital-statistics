require 'test_helper'
require 'cascadable'

class JeDAgeSexCompositeParserTest < ActiveSupport::TestCase

  def setup
    @parser = JeAgeSexParser.new('./test/fixtures/je_d_agesex.xls')
    HospitalType.delete_all
    @type1 = HospitalType.create(:text_de => 'Allgemeine Krankenhäuser, Zentrumsversorgung', :text_fr => 'Hôpitaux de soins généraux, prise en charge centralisée')
    HospitalType.create(:text_de => 'Allgemeine Krankenhäuser, Grundversorgung', :text_fr => 'Hôpitaux de soins généraux, soins de base')
    HospitalType.create(:text_de => 'Spezialkliniken: Psychiatrische Kliniken', :text_fr => 'Cliniques spécialisées: cliniques psychiatriques')
    @type2 = HospitalType.create(:text_de => 'Spezialkliniken: Rehabilitationskliniken', :text_fr => 'Cliniques spécialisées: cliniques de réadaptation')
    HospitalType.create(:text_de => 'Spezialkliniken: Andere Spezialkliniken', :text_fr => 'Cliniques spécialisées: autres cliniques spécialisées')
    @results = @parser.parse
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

    assert_equal(37.3056549, data['percentage'])
    assert_equal(4.63833525, data['dad'])
    assert_equal(2, data['sex'])
    assert_equal(0, data['interval']['from'])
    assert_equal(14, data['interval']['to'])
  end

  def test_last_dataset
    dataset = @results.last
    assert_equal("M544", dataset.code)
    assert_equal(1998, dataset.year)

    data = dataset.categorised_data.at(:sex_interval).first
    assert_not_nil(data)

    assert_equal(5.5, data['percentage'])
    assert_equal(23.0262172284644, data['dad'])
    assert_equal(0, data['sex'])
    assert_equal(0, data['interval']['from'])
  end

  def test_special_1998_data
    dataset = @results[540]
    assert_equal("Z380", dataset.code)
    assert_equal(1998, dataset.year)

    data = dataset.categorised_data.at(:sex_interval).first
    assert_not_nil(data)

    assert_equal(67.5, data['percentage'])
    assert_equal(5.26797993689831, data['dad'])
    assert_equal(0, data['sex'])
    assert_equal(0, data['interval']['from'])
    assert_equal(14, data['interval']['to'])
  end
end