Rails.application.routes.draw do

  # resources :mdcs, :except => [:new, :edit, :update, :destroy, :create] do
  #   get :name, :on => :collection
  #   get :drgs, :on => :member
  # end
  #
  # resources :chop_codes, :except => [:new, :edit, :update, :destroy, :create] do
  #   get :search, :on => :collection
  #   get :name, :on => :collection
  # end
  #
  # resources :icd_codes, :except => [:new, :edit, :update, :destroy, :create] do
  #   get :search, :on => :collection
  #   get :name, :on => :collection
  # end

  # Displaying the data happens under the namespace /api/v1/...
  # as reflected in the controller
  # only /index /show and /new shall be used for the time being
  namespace :api do
    namespace :v1 do
      namespace :groups do
        resources :icd, :only => [:index]
        resources :drg, :only => [:index]
      end
      resources :codes, :only => [:index, :show, :new] do
        resources :specific, :only => [:show]
        resources :datasets, :only => [:index, :show]
      end
      resources :chaptersbyyear, :only => [:show]
      resources :top3datasets, :only => [:index]
    end
  end

  # resources :drgs, :except => [:new, :edit, :update, :destroy, :create] do
  #   get :name, :on => :collection
  #   get :search, :on => :collection
  # end

  # get 'contact', :to => 'infos#contact'
  #
  root :to => 'infos#introduction'
  #
  get 'set_locale', :to => 'application#set_locale'
  # get 'search', :to => 'search#index'
  # See how all your routes lay out with "rake routes"
end
