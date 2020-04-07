class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :full_name
end
