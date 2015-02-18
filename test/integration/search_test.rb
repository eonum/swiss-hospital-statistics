# encoding: UTF-8
require 'test_helper'

class SearchTest < ActionDispatch::IntegrationTest

  test 'standard search empty' do
    get '/search'
    assert_response :success
    assert_select '#query'
  end

  test 'standard search non empty' do
    get '/search', {'query' => 'om', 'locale' => 'de'}
    assert_response :success

    assert_select '#query'

    assert_select '#main_inner table', 3

  end

  test 'search for icds standard' do
    get '/icd_codes/search', {}
    assert_response :success

    result = JSON.parse(@response.body)

    assert_equal result.length, 5
    assert_not_nil result[0]
  end

  test 'search for icds with search term' do
    get '/icd_codes/search', {'term' => 'tumor', 'limit' => 3, 'locale' => 'de'}
    assert_response :success

    result = JSON.parse(@response.body)

    assert_equal result.length, 3
    assert_equal result[0], 'C96.2 Bösartiger Mastzelltumor'
  end

  test 'search for icds with search term and different language' do
    get '/icd_codes/search', {'term' => 'tumor', 'limit' => 3, 'locale' => 'fr'}
    assert_response :success

    result = JSON.parse(@response.body)

    assert_equal result.length, 3
    assert_equal result[0], 'D63.0 Anémie au cours de maladies tumorales {C00-D48}'
  end

  test 'search for chop standard' do
    get '/chop_codes/search', {}
    assert_response :success

    result = JSON.parse(@response.body)

    assert_equal result.length, 5
    assert_not_nil result[0]
  end

  test 'search for drg standard' do
    get '/drgs/search', {}
    assert_response :success

    result = JSON.parse(@response.body)

    assert_equal result.length, 5
    assert_equal result[0], '901A Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie'
  end
end
